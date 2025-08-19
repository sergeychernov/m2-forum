import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import SlideWrapper from "../wrappers/SlideWrapper";
import QRCard from '../cards/QRCard';
import FeaturesListCard from '../cards/FeaturesListCard';

interface SlideProps {
	isActive: boolean;
	isVisited: boolean;
}

const TelegramBotSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
	const technologies = [
		{ icon: '🧠', text: 'YandexGPT' },
		{ icon: '💎', text: 'Gemini' },
		{ icon: '🗄️', text: 'YDB' },
		{ icon: '🎤', text: 'SpeechKit' },
		{ icon: '🤖', text: 'Grammy' },
	];

	return (
		<SlideWrapper
			title="Совместная разработка Telegram бота"
			subtitle="Cursor + Сергей + Cursor +Настя + Cursor + Маша = MVP"
			sign='🎩👩'
			cardVariant="elevated"
		>
			<CardsLayout
				cols="2"
				colsRatio="1:1"
				horizontalGap="medium"
				verticalGap="medium"
				contentWidth="medium"
				animationType="appearance"
				animationDelay={150}
				isActive={isActive}
				isVisited={isVisited}
			>
				<FeaturesListCard
					title="Используемые технологии"
					category="Стек проекта"
					features={technologies}
					animationType="appearance"
					animationIndex={0}
					animationDelay={150}
					isActive={isActive}
					isVisited={isVisited}
					
				/>

				<QRCard
					title="Telegram Bot Example"
					url="https://github.com/sergeychernov/m2-bot-example"
					icon="🤖"
					animationType="appearance"
					animationIndex={1}
					animationDelay={300}
					isActive={isActive}
					isVisited={isVisited}
				/>
			</CardsLayout>
		</SlideWrapper>
	);
};

export default TelegramBotSlide;