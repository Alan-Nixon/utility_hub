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
