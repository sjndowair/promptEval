import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { analytics } from './analytics';

interface UserData {
  id: string;
  name: string;
  email: string;
}

// Firestore에서 사용자 정보를 가져오는 함수
export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));

    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        id: uid,
        name: data.name || '',
        email: data.email || '',
      };
    }
    return null;
  } catch (error) {
    console.error('사용자 정보 가져오기 오류:', error);
    return null;
  }
};

// 회원가입 함수
export const signUp = async (email: string, password: string, name: string) => {
  try {
    // Firebase Auth로 사용자 생성
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // 사용자 프로필 업데이트
    await updateProfile(user, {
      displayName: name,
    });

    // Firestore에 사용자 정보 저장
    await setDoc(doc(db, 'users', user.uid), {
      name: name,
      email: email,
      createdAt: new Date().toISOString(),
      uid: user.uid,
    });

    // Store에서 사용할 수 있는 형태로 사용자 정보 반환
    const userData = {
      id: user.uid,
      name: name,
      email: email,
    };

    analytics.user.signUp();

    return { user: userData, error: null };
  } catch (error: any) {
    console.error('회원가입 오류:', error);
    return { user: null, error: error?.code! || error?.message! };
  }
};

// 로그인 함수
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Firestore에서 사용자 정보 가져오기
    const userData = await getUserData(user.uid);

    if (userData) {
      return { user: userData, error: null };
    } else {
      // Firestore에 정보가 없으면 Firebase Auth 정보로 설정
      const fallbackUserData = {
        id: user.uid,
        name: user.displayName || '',
        email: user.email || '',
      };
      return { user: fallbackUserData, error: null };
    }
  } catch (error: any) {
    console.error('로그인 오류:', error);
    return { user: null, error: error.code || error.message };
  }
};

// 로그아웃 함수
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch (error: any) {
    console.error('로그아웃 오류:', error);
    return { error: error.message };
  }
};

// Firebase 에러 메시지를 한국어로 변환
export const getFirebaseErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return '이미 사용 중인 이메일입니다.';
    case 'auth/weak-password':
      return '비밀번호가 너무 약합니다.';
    case 'auth/invalid-email':
      return '유효하지 않은 이메일 형식입니다.';
    case 'auth/user-not-found':
      return '등록되지 않은 이메일입니다.';
    case 'auth/wrong-password':
      return '잘못된 비밀번호입니다.';
    case 'auth/too-many-requests':
      return '너무 많은 시도로 인해 잠시 후 다시 시도해주세요.';
    default:
      return '오류가 발생했습니다. 다시 시도해주세요.';
  }
};
