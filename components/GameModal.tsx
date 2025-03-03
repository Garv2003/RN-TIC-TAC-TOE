import { Modal, Text, View, TouchableOpacity } from 'react-native';

export const GameModal = ({ visible, winner, resetGame }: { visible: boolean, winner: string, resetGame: () => void }) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View className="flex-1 items-center justify-center bg-black/70">
                <View className="w-80 p-6 bg-gray-800 rounded-lg items-center">
                    <Text className="text-2xl text-white font-bold">
                        {winner === 'Draw' ? 'It\'s a Draw! 🤝' : `Winner: ${winner} 🎉`}
                    </Text>
                    <TouchableOpacity onPress={resetGame} className="mt-5 px-6 py-3 bg-purple-500 rounded-lg">
                        <Text className="text-white text-lg font-semibold">Play Again</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}