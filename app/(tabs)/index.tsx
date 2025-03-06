import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { useState, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function HomeScreen() {
  const [player, setPlayer] = useState<'X' | 'O'>(Math.random() < 0.5 ? 'X' : 'O');
  const [board, setBoard] = useState(Array(9).fill(''));
  const [winner, setWinner] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const confettiRef = useRef<ConfettiCannon>(null);

  const handlePress = (index: number) => {
    if (board[index] || winner) return;

    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[index] = player;
      const winningPlayer = checkWin(newBoard);
      if (winningPlayer) {
        setWinner(winningPlayer);
        setModalVisible(true);
        setTimeout(() => confettiRef.current?.start(), 300);
      } else if (newBoard.every(cell => cell !== '')) {
        setWinner('Draw');
        setModalVisible(true);
      } else {
        setPlayer((prev) => (prev === 'X' ? 'O' : 'X'));
      }

      return newBoard;
    });
  };


  const checkWin = (board: string[]) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    for (const [a, b, c] of winPatterns) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setPlayer(Math.random() < 0.5 ? 'X' : 'O');
    setWinner('');
    setModalVisible(false);
  };

  return (
    <LinearGradient
      colors={['#0d0d0d', '#1a1a2e']}
      className="flex-1 items-center justify-center"
    >
      <Text className="text-3xl text-white mb-8 font-extrabold tracking-widest">
        Tic Tac Toe
      </Text>

      <View className="w-72 flex flex-row justify-center items-center mb-6">
        <Text className="text-2xl text-gray-300 font-semibold">Player</Text>
        <Text className="text-2xl text-purple-400 font-bold ml-2">{player}</Text>
      </View>

      <View className="w-72 h-72 flex flex-wrap border-4 border-gray-700 bg-gray-900/50 rounded-xl overflow-hidden shadow-lg shadow-purple-900">
        {board.map((cell, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handlePress(index)}
              className="w-1/3 h-1/3 border border-gray-700 flex items-center justify-center active:bg-purple-600/20"
            >
              <Text className="text-6xl text-gray-300 font-bold">{cell}</Text>
            </TouchableOpacity>
          )
        })}
      </View>

      <ConfettiCannon
        count={100}
        origin={{ x: 180, y: 0 }}
        fadeOut={true}
        autoStart={false}
        ref={confettiRef}
      />

      <Modal visible={isModalVisible} transparent animationType="fade">
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
    </LinearGradient>
  );
}
