import { UserDetails, Subscription } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser as supauser } from "@supabase/auth-helpers-react";
import { } from "@supabase/auth-js";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;


}


export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export interface Props {
    [propName: string]: any
}

export const MyUUserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
    } = useSessionContext();

    const user = supauser();
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const getUserDetails = () => supabase.from('users').select('*').single();
    const getSubscription = () =>
        supabase
            .from('subscriptions')
            .select('*,prices(*,product(*))')
            .in('status', ['trialing', 'active'])
            .single();

    useEffect(() => {
        if (user && !isLoadingData && !userDetails && !subscription) {
            setIsLoadingData(true);
            Promise.allSettled([getUserDetails(), getSubscription()]).then(
                (results) => {
                    const userDetailsPromise = results[0];
                    const subscriptionPromise = results[1];
                    if (userDetailsPromise.status === 'fulfilled') {
                        setUserDetails(userDetailsPromise.value.data as UserDetails);

                    }
                    if (subscriptionPromise.status === 'fulfilled') {
                        setUserDetails(subscriptionPromise.value.data as UserDetails);

                    }
                    setIsLoadingData(false);
                }
            )
        } else if (!user && !isLoadingUser && !isLoadingData) {
            setUserDetails(null);
            setSubscription(null)
        }
    }, [user, isLoadingUser]
    );

    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription

    }

    return (
        <UserContext.Provider value={value} {...props} />
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        if (context === undefined) {
            throw new Error('use User must be used within a myser')
        }
    }

    return context;
}