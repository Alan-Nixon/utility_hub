import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import GLOBE from 'vanta/dist/vanta.globe.min';
import NET from 'vanta/dist/vanta.net.min';
import TOPOLOGY from 'vanta/dist/vanta.topology.min';
import { Logout } from '../../function/firebaseFunctions';

function VantaHead({ user }: any) {
    const vantaRef = useRef<HTMLDivElement | null>(null);
    const vantaEffect = useRef<any>(null);
    const Navigate = useNavigate()
    useEffect(() => window.scrollTo(0, 0), [])


    useEffect(() => {
        if (!vantaEffect.current && vantaRef.current) {
            vantaEffect.current = GLOBE({
                el: vantaRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0xff3f81,
                backgroundColor: 0x23153c,
                points: 10,
                maxDistance: 20,
                spacing: 15,
                showDots: true,
                THREE: THREE
            });
        }

        return () => { if (vantaEffect.current) vantaEffect.current.destroy() };
    }, []);
    console.log(user, "yed ")
    return (
        <div ref={vantaRef} className="relative w-full h-[450px] overflow-hidden">
            <div className="flex mt-3 w-full">
                <span className="text-white ml-5 font-bold">Utility Hub</span>
                <div className="ml-auto">
                    <span className={user ? "mr-5 font-bold text-white" : "mr-5 font-bold text-white cursor-pointer"} onClick={() => { return user ? null : Navigate('/login') }}>{user ? user?.providerData[0]?.displayName + "" : "Login"}</span>
                    {user && <span className="mr-5 font-bold cursor-pointer text-white" onClick={() => {
                        Logout().then(() => Navigate("/login"))
                    }}>Logout</span>}
                </div>
            </div>
        </div >
    );
}

export default VantaHead;

export function VantaLogin() {
    const vantaRef = useRef<HTMLDivElement | null>(null);
    const vantaEffect = useRef<any>(null);

    useEffect(() => {
        if (!vantaEffect.current && vantaRef.current) {
            vantaEffect.current = NET({
                el: vantaRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0xff3f81,
                backgroundColor: 0x23153c,
                points: 10,
                maxDistance: 20,
                spacing: 15,
                showDots: true,
                THREE: THREE
            });
        }

        return () => {
            if (vantaEffect.current) vantaEffect.current.destroy();
        };
    }, []);

    return (
        <div ref={vantaRef} className="relative h-screen w-[750px] overflow-hidden" />
    );
}

export const VantaRegister = () => {
    const vantaRef = useRef<HTMLDivElement | null>(null);
    const vantaEffect = useRef<any>(null);

    useEffect(() => {

        if (!vantaEffect.current && vantaRef.current) {
            vantaEffect.current = TOPOLOGY({
                el: vantaRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0xff3f81,
                backgroundColor: 0x23153c,
                points: 10,
                maxDistance: 20,
                spacing: 15,
                showDots: true,
                THREE: THREE
            });
        }

        return () => {
            console.log("Destroying Vanta effect");
            if (vantaEffect.current) vantaEffect.current.destroy();
        };
    }, []);

    return (
        <div ref={vantaRef} className="relative h-screen w-[750px] overflow-hidden" />
    );
}
