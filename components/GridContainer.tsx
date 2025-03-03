import { View, Text, TouchableOpacity } from "react-native";

export const GridContainer = ({ board, handlePress }: { board: string[], handlePress: (index: number) => void }) => {
    return (
        <View className="w-72 h-72 flex flex-wrap border-4 border-gray-700 bg-gray-900/50 rounded-xl overflow-hidden shadow-lg shadow-purple-900">
            {board.map((cell, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handlePress(index)}
                        className="w-1/3 h-1/3 border border-gray-700 items-center justify-center active:bg-purple-600/20"
                    >
                        <Text className="text-6xl text-gray-300 font-bold">{cell}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}