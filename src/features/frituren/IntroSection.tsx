
import { motion } from "framer-motion";

interface IntroSectionProps {
  team: string;
}

const IntroSection = ({ team }: IntroSectionProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8"
    >
      <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
        Team {team}
      </span>
      <h1 className="text-4xl font-bold mb-4">Frituren Selection</h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Browse through the list of frituren and select the ones you want for your team.
        Once a frituur is selected by a team, it cannot be selected by another team.
      </p>
    </motion.div>
  );
};

export default IntroSection;
