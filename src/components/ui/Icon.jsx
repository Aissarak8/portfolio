import {
  Code2,
  Layout,
  Server,
  BrainCircuit,
  Wrench,
  Workflow,
  ShoppingCart,
  Sparkles,
} from 'lucide-react';

// Maps the string `icon` names used in data files to lucide components.
const map = {
  Code2,
  Layout,
  Server,
  BrainCircuit,
  Wrench,
  Workflow,
  ShoppingCart,
  Sparkles,
};

export default function Icon({ name, ...props }) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp {...props} />;
}
