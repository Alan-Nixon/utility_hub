import { motion } from 'framer-motion';

export const TypingText = ({ text }: { text: string }) => {
    const words = text.split(' ');

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="inline-block"
        >
            {words.map((word, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="inline-block mr-1" 
                >
                    {word}
                </motion.div>
            ))}
        </motion.div>
    );
};


export function LoadingPage() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
                </div>
            </div>
                <div className="text-black text-3xl font-bold ml-2">Loading...</div>
        </div>
    )
}