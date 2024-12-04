import { gsap } from 'gsap';
import { useLayoutEffect, useRef } from 'react';


export default () => {
    let boxRef = useRef();
    useLayoutEffect(() => {
        gsap.fromTo(boxRef.current, {
            opacity: 0,
<<<<<<< HEAD
            
        }, { opacity: 1, duration: 2 });
        
    }, []);

    return (
        <div ref={boxRef} className="bg-gradient-to-r from-primary via-secondary to-accent mx-auto h-20 w-fit flex items-center justify-center bg-clip-text">
            <h1 className="
                text-5xl 
                font-bold 
                text-transparent
                text-primary 
                mb-5 mt-5
                
=======

        }, { opacity: 1, duration: 2 });

    }, []);

    return (
        <div ref={boxRef} className="bg-gradient-to-r from-primary via-secondary to-accent mx-auto h-20 w-fit flex items-center justify-center bg-clip-text animate-pulse">
            <h1 className="
                text-5xl
                font-bold
                text-transparent
                text-primary
                mb-5 mt-5

>>>>>>> dev
                "
            >Shopping List</h1>
        </div>
    )
}