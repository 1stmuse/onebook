import React from 'react'
import { Alert } from 'react-native'
import LocalAuthentication from "rn-local-authentication"

type AuthenticateResponse = {
  success: boolean;
  warning?: string;
};


export const useBiometric = async () => {
  const authenticate = async () => {
    const authenticated: AuthenticateResponse =
      await LocalAuthentication.authenticateAsync({
        fallbackEnabled: true,
        cancelTitle: 'Cancel',
        reason: "Biometric is required to login"
      })

    return authenticated
  }

  return {
    hasHardware: await LocalAuthentication.isAvailableAsync(),
    isSupported: await LocalAuthentication.isSupportedAsync(),
    enrolled: await LocalAuthentication.getBiometryStatusAsync(),
    authenticate,
  }
}
