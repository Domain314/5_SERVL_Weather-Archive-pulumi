import React, { useEffect, useState, Suspense, lazy } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ToastStyles.css";

import LazyComponent from "./optimization/LazyComponent";
import BackendDataProvider from './settings/BackendDataProvider';
import Syncer from "./utility/Syncer";

const Navbar = lazy(() => import("./components/Navbar"));

const FrontPage = lazy(() => import("./components/pages/FrontPage"));
const Weather = lazy(() => import("./components/pages/Weather"));

import { initObserver } from "./scrollObserver";

import { consoleAsciiArt } from "./utility/consoleLogger"

function App() {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    useEffect(() => {
        initObserver();
        consoleAsciiArt();
    })

    return (
        <div className="text-white">
            <BackendDataProvider>
                <HashRouter>
                    <Routes>

                        <Route path="/">
                            <Route index element={
                                <>
                                    <Navbar />
                                    <div className="w-full flex justify-center bg-[#f8f9fa] dark:bg-slate-950">
                                        <div className="w-full max-w-[1600px] px-4 md:px-12 2xl:px-4 my-[150px]">
                                            <Suspense fallback={<div></div>}>
                                                <LazyComponent children={<FrontPage />} fallback={<div></div>} />
                                            </Suspense>
                                        </div>
                                    </div>

                                    {/* GoUp Button */}
                                    <button
                                        onClick={scrollToTop}
                                        className="fixed bottom-5 right-5 p-4 rounded bg-sky-500/20 hover:bg-sky-500 hover:scale-110 hover:shadow-lg hover:shadow-sky-500/50 transition-all duration-200 ease-in-out"
                                        aria-label="scroll to top"
                                    >
                                        <p className="font-bold text-2xl">↑</p>
                                    </button>

                                </>
                            } />

                            <Route path="weather" element={
                                <Suspense fallback={<div></div>}><Navbar /><Weather /></Suspense>
                            } />

                        </Route>
                    </Routes>
                </HashRouter>
                <Syncer />
                <ToastContainer />

            </BackendDataProvider>
        </div>
    );
}

export default App;