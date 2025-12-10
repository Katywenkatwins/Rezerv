import { motion, AnimatePresence } from 'motion/react';
import { Info, FileText, RefreshCw, PlusCircle, FileOutput, Navigation, Edit } from 'lucide-react';

interface ActionMenuProps {
  onClose: () => void;
}

export function ActionMenu({ onClose }: ActionMenuProps) {
  const menuItems = [
    { icon: Info, text: 'Переглянути документ' },
    { icon: FileText, text: 'Завантажити PDF' },
    { icon: RefreshCw, text: 'Оновити документ' },
    { icon: PlusCircle, text: 'Розширені дані з реєстру' },
    { icon: FileOutput, text: 'Подати запит на відстрочку' },
    { icon: Navigation, text: 'Направлення на ВЛК' },
    { icon: Edit, text: 'Уточнити контактні дані' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-[393px] mx-auto bg-white rounded-t-3xl p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Handle */}
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>

          {/* Menu items */}
          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors text-left"
                onClick={() => {
                  console.log(`Clicked: ${item.text}`);
                  onClose();
                }}
              >
                <item.icon size={24} className="text-[#2c2c2c]" />
                <span className="flex-1 text-[#2c2c2c] font-['e-Ukraine',sans-serif]">{item.text}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}