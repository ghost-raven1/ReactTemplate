import React from 'react';
import { Form } from 'antd';
import type { FormInstance } from 'antd';
import { Logger } from '../Logger/Logger';

export interface FormManagerProps {
  form?: FormInstance;
  initialValues?: Record<string, any>;
  onFinish?: (values: any) => void;
  onFinishFailed?: (errorInfo: any) => void;
  onValuesChange?: (changedValues: any, allValues: any) => void;
  autoSave?: boolean;
  autoSaveDelay?: number;
  showValidationMessages?: boolean;
}

export interface FormField {
  name: string;
  label: string;
  rules?: any[];
  dependencies?: string[];
  validateTrigger?: string | string[];
}

export class FormManager {
  private static instance: FormManager;
  public logger: Logger;
  private formCache: Map<string, any> = new Map();
  private autoSaveTimers: Map<string, NodeJS.Timeout> = new Map();

  private constructor() {
    this.logger = Logger.getInstance();
  }

  static getInstance(): FormManager {
    if (!FormManager.instance) {
      FormManager.instance = new FormManager();
    }
    return FormManager.instance;
  }

  // Инициализация формы
  initForm(formId: string, initialValues?: Record<string, any>) {
    this.formCache.set(formId, initialValues || {});
    this.logger.info(`Form initialized: ${formId}`, { initialValues });
  }

  // Сохранение состояния формы
  saveFormState(formId: string, values: any) {
    this.formCache.set(formId, values);
    this.logger.debug(`Form state saved: ${formId}`, { values });
  }

  // Получение состояния формы
  getFormState(formId: string) {
    return this.formCache.get(formId);
  }

  // Очистка состояния формы
  clearFormState(formId: string) {
    this.formCache.delete(formId);
    this.logger.info(`Form state cleared: ${formId}`);
  }

  // Автоматическое сохранение
  setupAutoSave(formId: string, form: FormInstance, delay: number = 1000) {
    const timer = this.autoSaveTimers.get(formId);
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      form.validateFields().then(values => {
        this.saveFormState(formId, values);
      }).catch(error => {
        this.logger.warning(`Form validation failed during auto-save: ${formId}`, { error });
      });
    }, delay);

    this.autoSaveTimers.set(formId, newTimer);
  }

  // Очистка автосохранения
  clearAutoSave(formId: string) {
    const timer = this.autoSaveTimers.get(formId);
    if (timer) {
      clearTimeout(timer);
      this.autoSaveTimers.delete(formId);
    }
  }

  // Валидация формы
  async validateForm(form: FormInstance) {
    try {
      const values = await form.validateFields();
      this.logger.info('Form validation successful', { values });
      return { success: true, values };
    } catch (error) {
      this.logger.error('Form validation failed', { error });
      return { success: false, error };
    }
  }

  // Сброс формы
  resetForm(form: FormInstance) {
    form.resetFields();
    this.logger.info('Form reset');
  }

  // Установка значений формы
  setFormValues(form: FormInstance, values: Record<string, any>) {
    form.setFieldsValue(values);
    this.logger.info('Form values set', { values });
  }
}

export const useFormManager = (formId: string, options: FormManagerProps = {}) => {
  const [form] = Form.useForm();
  const formManager = FormManager.getInstance();
  const {
    autoSave = false,
    autoSaveDelay = 1000,
    showValidationMessages = true,
  } = options;

  React.useEffect(() => {
    formManager.initForm(formId, options.initialValues);

    if (autoSave) {
      formManager.setupAutoSave(formId, form, autoSaveDelay);
    }

    return () => {
      formManager.clearAutoSave(formId);
      formManager.clearFormState(formId);
    };
  }, [formId, autoSave, autoSaveDelay]);

  const handleValuesChange = (changedValues: any, allValues: any) => {
    if (autoSave) {
      formManager.setupAutoSave(formId, form, autoSaveDelay);
    }
    options.onValuesChange?.(changedValues, allValues);
  };

  const handleFinish = (values: any) => {
    formManager.saveFormState(formId, values);
    options.onFinish?.(values);
  };

  const handleFinishFailed = (errorInfo: any) => {
    if (showValidationMessages) {
      formManager.logger.error('Form submission failed', { errorInfo });
    }
    options.onFinishFailed?.(errorInfo);
  };

  return {
    form,
    formManager,
    formProps: {
      form,
      onFinish: handleFinish,
      onFinishFailed: handleFinishFailed,
      onValuesChange: handleValuesChange,
      initialValues: options.initialValues,
    },
  };
}; 