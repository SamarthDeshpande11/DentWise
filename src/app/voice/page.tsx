import React from 'react'
import Navbar from '@/components/Navbar';
import { auth } from '@clerk/nextjs/server'
import VapiWidget from '@/components/voice/VapiWidget';
import WelcomeSection from '@/components/voice/WelcomeSection';
import FeatureCards from '@/components/voice/FeatureCards';
import ProPlanRequired from '@/components/voice/ProPlanRequired';
async function voicepage() {
    const {has}=await auth();

    const hasProPlan=has({plan:"ai_basic"}) || has({plan:"ai_pro"})
    if(!true) return (<ProPlanRequired/>)

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="nax-w-7xl  mx-auto px-6 py-8 pt-24">
                <WelcomeSection />
                <FeatureCards/>
            </div>
            <VapiWidget />
        </div>
    )
}

export default voicepage