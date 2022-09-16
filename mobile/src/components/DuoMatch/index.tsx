import {
  View,
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { CheckCircle } from "phosphor-react-native";

import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../Heading";

import * as Clipboard from "expo-clipboard";
import { useState } from "react";

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopping, setIsCopping] = useState(false);

  async function handleCopyDiscordUserToClipboard() {
    setIsCopping(true);

    await Clipboard.setStringAsync(discord);

    Alert.alert(
      "Discord copiado!",
      "Usuário copiado para você colar no Discord e encontrar essa pessoa"
    );

    setIsCopping(false);
  }

  return (
    <Modal animationType="fade" statusBarTranslucent transparent {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />
          <Heading
            style={{ alignItems: "center", marginTop: 24 }}
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
          />
          <Text style={styles.label}>Adicione no Discord</Text>
          <TouchableOpacity
            disabled={isCopping}
            onPress={handleCopyDiscordUserToClipboard}
            style={styles.discordButton}
          >
            <Text style={styles.discord}>
              {isCopping ? (
                <ActivityIndicator color={THEME.COLORS.PRIMARY} />
              ) : (
                discord
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
