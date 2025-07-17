import React from 'react';
import RootSiblingsManager from 'react-native-root-siblings';
import AnimatedContainer from './AnimateContainer';

type AnimationType =
  | 'fade'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'zoom';

interface AlertOptions {
  key: string;
  maskTouchClosable?: boolean;
  closedCallback?: () => void;
  maskColor?: string;
  maskStyle?: object;
  animationType?: AnimationType;
}

type AlertNode = {
  rootNode: RootSiblingsManager;
  onClose: () => void;
};

class AlertManager {
  static _alertNodes: Record<string, AlertNode> = {};
  static options: Partial<AlertOptions> = {};

  static show(modalView: React.ReactNode, options: AlertOptions) {
    const {
      key,
      maskTouchClosable = true,
      closedCallback,
      maskColor = 'rgba(0, 0, 0, 0.4)',
      animationType = 'fade',
    } = options;
    if (this._alertNodes[key]) return;
    AlertManager.options = options;
    let rootNode: RootSiblingsManager | null;
    const onClose = () => {
      rootNode?.destroy();
      rootNode = null;
      closedCallback?.();
      delete this._alertNodes[key];
    };

    rootNode = new RootSiblingsManager(
      (
        <AnimatedContainer
          maskTouchClosable={maskTouchClosable}
          modalView={modalView}
          onClose={onClose}
          animationType={animationType}
          maskColor={maskColor}
        />
      )
    );

    this._alertNodes[key] = { rootNode, onClose };
  }

  static update(key: string, modalView: React.ReactNode) {
    const {
      maskTouchClosable,
      maskColor = 'rgba(0,0,0,.2)',
      animationType = 'slide-up',
    } = AlertManager.options;
    if (this._alertNodes[key]) {
      const { rootNode, onClose } = this._alertNodes[key];
      rootNode.update(
        <AnimatedContainer
          maskTouchClosable={maskTouchClosable}
          modalView={modalView}
          animationType={animationType}
          maskColor={maskColor}
          onClose={onClose}
        />
      );
    }
  }

  static hide(key: string) {
    this._alertNodes?.[key]?.onClose?.();
  }
}
export default AlertManager;
export type { AlertOptions, AlertNode, AnimationType };
