declare global {
    interface Window {
        gtag: (
            command: "config" | "event" | "js" | "set",
            targetId: string | Date | any,
            config?: any
        ) => void;
        dataLayer: any[];
    }
}
export const analysis = {
    pageView: (pagePath: string) => {
       if(typeof window !== "undefined" && window.gtag){
        window.gtag("config", process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, {
            page_title: document?.title,
            page_location: window?.location.href,
            page_path: pagePath
        }) 

       }
    },

event: (action: string, category: string ="engagement", label?: string, value?: number) => {
     if(typeof window !== "undefined" && window?.gtag){
         window.gtag("event", action, {
            event_category: action,
            event_label: label,
            value: value
         })
     }
},

user: {
    signUp: () => analysis.event("signUp", "user_action", "email_registration"),
    signIn: () => analysis.event("signIn", "user_action", "email_login"),
    signOut: () => analysis.event("signOut", "user_action")
},

prompt: {
    submit: (length: number) => analysis.event("prompt_submit", "core_feature", "prompt_evaluation", length),
    evaluate: () => analysis.event("prompt_evaluate", "core_feature", "ai_amalysis"),
    viewResults: () => analysis.event("view_results", "core_feature", "analysis_complete")
},

engagement: {
    buttonClick: (buttonName: string) => analysis.event("button_click", "engagement", buttonName),
    scroll: (depth: number) => analysis.event("scroll", "enagagement", "scroll_depth", depth),
    timeSpent: (seconds: number) => analysis.event("timing_complete", "engagement", "time_on_page", seconds)
,

error: (errorType: string, message: string) => {
    analysis.event("exception", "error", `${errorType}: ${message}`)
}


}}