import React from "react";
import { Text } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import styles from "../styles/signInStyles";

/**
 * CredentialDialog Component
 * A reusable modal for missing credentials alert
 * @param {boolean} visible - Controls visibility
 * @param {function} onDismiss - Function to close modal
 */
const WarningDialog = ({ visible, onDismiss }) => (
  <Portal>
    <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialogContainer}>
      <Dialog.Title style={styles.dialogTitle}>⚠️ Missing Credentials</Dialog.Title>
      <Dialog.Content>
        <Text style={styles.dialogText}>Please enter your username and password to continue.</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button mode="contained" onPress={onDismiss} style={styles.tryAgainButton}>
          Try Again
        </Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

export default WarningDialog;
