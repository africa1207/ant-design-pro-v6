import { message, notification, Modal } from 'antd';
import { ModalFuncProps } from 'antd/lib';
import { ExclamationCircleOutlined } from '@ant-design/icons';

type NotifyType = 'info' | 'success' | 'error' | 'warning';

export default function useModal() {
  const modal = {
    // 消息提示
    msg(content: string): void {
      message.info(content);
    },
    // 错误消息
    msgError(content: string): void {
      message.error(content);
    },
    // 成功消息
    msgSuccess(content: string): void {
      message.success(content);
    },
    // 警告消息
    msgWarning(content: string): void {
      message.warning(content);
    },
    // 弹出提示
    alert: (content: string): void => {
      Modal.warning({
        title: '系统提示',
        content,
        icon: <ExclamationCircleOutlined />,
      });
    },
    // 错误提示
    alertError: (content: string, modalConfig: Omit<ModalFuncProps, 'content'>): void => {
      Modal.error({
        title: '系统提示',
        content,
        ...modalConfig,
      });
    },
    // 成功提示
    alertSuccess: (content: string, modalConfig: Omit<ModalFuncProps, 'content'>): void => {
      Modal.success({
        title: '系统提示',
        content,
        ...modalConfig,
      });
    },
    // 警告提示
    alertWarning: (content: string, modalConfig: Omit<ModalFuncProps, 'content'>): void => {
      Modal.warning({
        title: '系统提示',
        content,
        ...modalConfig,
      });
    },
    // 通知提示
    notify: (content: string, type: NotifyType = 'info'): void => {
      notification[type]({ message: '系统提示', description: content });
    },
    // 错误通知
    notifyError: (content: string): void => {
      modal.notify(content, 'error');
    },
    // 成功通知
    notifySuccess: (content: string): void => {
      modal.notify(content, 'success');
    },
    // 警告通知
    notifyWarning: (content: string): void => {
      modal.notify(content, 'warning');
    },
    // 确认窗体
    confirm: (content: string, modalConfig?: Omit<ModalFuncProps, 'content'>): void => {
      Modal.confirm({
        icon: modalConfig?.icon || <ExclamationCircleOutlined />,
        content,
        ...modalConfig,
      });
    },
  };
  return { ...modal };
}
export type ModalType = ReturnType<typeof useModal>;
