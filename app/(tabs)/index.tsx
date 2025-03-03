import { View, Text } from 'react-native';
import { useState, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import ConfettiCannon from 'react-native-confetti-cannon';
import { GridContainer } from '@/components/GridContainer';
import { GameModal } from '@/components/GameModal';

export default function HomeScreen() {
  const [player, setPlayer] = useState<'X' | 'O'>(Math.random() < 0.5 ? 'X' : 'O');
  const [board, setBoard] = useState(Array(9).fill(''));
  const [winner, setWinner] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const confettiRef = useRef<ConfettiCannon>(null);

  const handlePress = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    const winningPlayer = checkWin(newBoard);
    if (winningPlayer) {
      setWinner(winningPlayer);
      setModalVisible(true);
      confettiRef.current?.start();
    } else if (newBoard.every(cell => cell !== '')) {
      setWinner('Draw');
      setModalVisible(true);
    } else {
      setPlayer(player === 'X' ? 'O' : 'X');
    }
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

      <GridContainer
        board={board}
        handlePress={handlePress}
      />

      {winner && winner !== 'Draw' && (
        <ConfettiCannon
          count={100}
          origin={{ x: 180, y: 0 }}
          autoStart={false}
          fadeOut={true}
          ref={confettiRef}
        />
      )}
      <GameModal visible={isModalVisible} winner={winner} resetGame={resetGame} />
    </LinearGradient>
  );
}
