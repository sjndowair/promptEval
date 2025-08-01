import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { signIn, signUp, signOut, getUserData } from './auth-service';
import { useStore } from './store';
import { toast } from 'sonner';

interface ISignInData {
  email: string;
  password: string;
}

interface ISignUpData {
  email: string;
  password: string;
  name: string;
}

// 로그인 Mutation
export const useSignInMutation = () => {
  const queryClient = useQueryClient();
  const { setUser, setIsLoginModalOpen } = useStore();

  return useMutation({
    mutationFn: async ({ email, password }: ISignInData) => {
      const result = await signIn(email, password);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.user;
    },
    onSuccess: userData => {
      // 쿼리 캐시 업데이트
      queryClient.setQueryData(['auth', 'user'], userData);

      // Zustand store 업데이트
      setUser(userData);

      // 모달 닫기
      setIsLoginModalOpen(false);

      toast.success('로그인 되었습니다!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

// 회원가입 Mutation
export const useSignUpMutation = () => {
  const queryClient = useQueryClient();
  const { setUser, setIsSignupModalOpen } = useStore();

  return useMutation({
    mutationFn: async ({ email, password, name }: ISignUpData) => {
      console.log(email, password, name);
      const result = await signUp(email, password, name);
      console.log(result);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.user;
    },
    onSuccess: userData => {
      // 쿼리 캐시 업데이트
      queryClient.setQueryData(['auth', 'user'], userData);

      // Zustand store 업데이트
      setUser(userData);

      // 모달 닫기
      setIsSignupModalOpen(false);

      toast.success('회원가입이 완료되었습니다!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

// 로그아웃 Mutation
export const useSignOutMutation = () => {
  const queryClient = useQueryClient();
  const { setUser } = useStore();

  return useMutation({
    mutationFn: async () => {
      const result = await signOut();
      if (result.error) {
        throw new Error(result.error);
      }
    },
    onSuccess: () => {
      // 쿼리 캐시 클리어
      queryClient.setQueryData(['auth', 'user'], null);
      queryClient.removeQueries({ queryKey: ['user'] }); // 사용자 관련 모든 쿼리 제거

      // Zustand store 업데이트
      setUser(null);

      toast.success('로그아웃 되었습니다!');
    },
    onError: () => {
      toast.error('로그아웃 중 오류가 발생했습니다.');
    },
  });
};

// 사용자 정보 쿼리
export const useUserQuery = (uid: string | null) => {
  return useQuery({
    queryKey: ['user', uid],
    queryFn: () => getUserData(uid!),
    enabled: !!uid, // uid가 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};
