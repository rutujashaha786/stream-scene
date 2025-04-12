"use client";
import CategoriesSection, { CategoriesFallback } from '@/components/section/CategoriesSection';
import { buttonVariants } from '@/components/ui/button';
import { api, ENDPOINT } from '@/lib/api';
import { cn } from '@/lib/utils';
import { FolderLockIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

function WatchList() {
    const userData = useSelector((state) => state.user);
    const [watchlistData, setWatchlistData] = useState(null);
    const [isFetched, setIsFetched] = useState(false);

    // Use useEffect to fetch data only once when component mounts
    useEffect(() => {
        const fetchData = async () => {
            if (userData.isLoggedIn) {
                try {
                    const res = await api.get(ENDPOINT.getWishlist);
                    setWatchlistData(res.data.data);
                } catch (error) {
                    console.error("Error fetching watchlist:", error);
                }
            } 
            setIsFetched(true);
        };
        fetchData();
    }, [userData.isLoggedIn]);

    // Create memoized fetcher function that returns cached data
    const fetcher = useCallback(async () => {
        return watchlistData || [];
    }, [watchlistData]);


    const title = "Watchlist"
    const id = "watchlistheading"
    return (
        <div className="mt-[80px] p-4">
            {userData.isLoggedIn ? (
                isFetched ? (
                    <CategoriesSection
                        fetcher={fetcher}
                        title={title}
                        id={id}
                    />
                ) : ( 
                    <div className="py-8 px-6">
                        <h2 id={id} className="text-2xl font-medium mb-6 scroll-m-[100px]">
                            {title}
                        </h2>
                        <CategoriesFallback />
                    </div> 
                )
            ) : <div className="flex flex-col items-center justify-center h-[90vh] w-full gap-4">
                <FolderLockIcon
                    className="w-32 h-32 text-slate-400"
                    strokeWidth={1.2}
                />
                <p className="text-base text-slate-400">
                    Login to see your watchlist
                </p>

                <Link href={"/login"} className={cn(buttonVariants(), "rounded-full px-6 mt-4")}>Login</Link>
            </div>}
        </div>
    )
}

export default WatchList