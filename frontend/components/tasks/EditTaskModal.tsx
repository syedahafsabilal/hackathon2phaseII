import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Task } from '../../lib/types';
import { validateTask } from '../../lib/validations';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onSave: (updatedData: Partial<{ title: string; description: string; isCompleted: boolean }>) => void;
}

export const EditTaskModal = ({ isOpen, onClose, task, onSave }: EditTaskModalProps) => {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when task prop changes
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || ''
      });
      setErrors({});
    }
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validation = validateTask({
      title: formData.title,
      description: formData.description || undefined
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Call parent function to save task
      onSave({
        title: formData.title,
        description: formData.description || undefined
      });

      // Reset form
      setFormData({ title: '', description: '' });
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Reset form and errors when closing
    setFormData({
      title: task.title,
      description: task.description || ''
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Edit Task"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="What needs to be done?"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'border-red-500' : ''}
            required
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            placeholder="Add details..."
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'border-red-500' : ''}
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};