import { useState, useCallback, type SetStateAction } from "react";
import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import firstImage from "/public/images/2510.jpg";
import secondmage from "/public/images/2816.jpg";

export function Carrosel() {
	const SLIDE_CHANGE_THRESHOLD = 100;

	const arrowStyles = {
		cursor: "pointer",
		pos: "absolute",
		top: "50%",
		w: "auto",
		mt: "-1.375rem",
		p: "1rem",
		color: "white",
		fontWeight: "bold",
		fontSize: "1.125rem",
		transition: "0.6s ease",
		borderRadius: "0 .1875rem .1875rem 0",
		userSelect: "none",
		_hover: {
			opacity: 0.8,
			bg: "black",
		},
	} as const;


	const slides = [
		{
			img: `${firstImage}`,
			label: "",
			description: "",
		},
		{
			img: `${secondmage}`,
			label: "",
			description: "",
		},
	];

	

	const [currentSlide, setCurrentSlide] = useState(0);
	const [dragging, setDragging] = useState(false);
	const [dragStartX, setDragStartX] = useState(0);
	const [dragOffset, setDragOffset] = useState(0);

	const slidesCount = slides.length;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const prevSlide = useCallback(() => {
		setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
	}, []);
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const nextSlide = useCallback(() => {
		setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
	}, []);

	const handleMouseDown = useCallback(
		(e: { clientX: SetStateAction<number>; preventDefault: () => void }) => {
			setDragging(true);
			setDragStartX(e.clientX);
			e.preventDefault();
		},
		[],
	);

	const handleMouseMove = useCallback(
		(e: { clientX: number; preventDefault: () => void }) => {
			if (dragging) {
				const diffX = e.clientX - dragStartX;
				setDragOffset(diffX);
				e.preventDefault();
			}
		},
		[dragging, dragStartX],
	);

	const handleMouseUp = useCallback(() => {
		if (dragging) {
			setDragging(false);
			if (Math.abs(dragOffset) > SLIDE_CHANGE_THRESHOLD) {
				const slideChange = dragOffset > 0 ? prevSlide : nextSlide;
				slideChange();
			}
			setDragOffset(0);
		}
	}, [dragging, dragOffset, prevSlide, nextSlide]);

	// Do not move first slide to the right and last slide to the left
	const slideOffset =
		currentSlide === 0
			? Math.min(dragOffset, 0)
			: currentSlide === slidesCount - 1
				? Math.max(dragOffset, 0)
				: dragOffset;

	const carouselStyle = {
		transition: dragging ? "none" : "all .5s",
		ml: `calc(-${currentSlide * 100}% + ${slideOffset}px)`,
	};

	return (
		<Flex
			w="full"
			// bg="#edf3f8"
			_dark={{ bg: "#3e3e3e" }}
			p={10}
			alignItems="center"
			justifyContent="center"
			style={{ cursor: dragging ? "grabbing" : "auto" }}
			onMouseLeave={handleMouseUp}
		>
			<Flex w="full" overflow="hidden" pos="relative">
				<Flex
					h="25rem"
					w="full"
					onMouseUp={handleMouseUp}
					onMouseMove={handleMouseMove}
					onMouseDown={handleMouseDown}
					{...carouselStyle}
				>
					{slides.map((slide, sid) => (
						<Box
							key={`slide-${
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								sid
							}`}
							boxSize="full"
							shadow="md"
							flex="none"
							pos="relative"
						>
							<Text
								color="white"
								fontSize="xs"
								p=".5rem .75rem"
								pos="absolute"
								top="0"
							/>
							<Box
								width="100%"
								height="100%"
								backgroundImage={`url(${slide.img})`}
								backgroundColor="rgba(0, 0, 0, 0.1)"
								backgroundBlendMode="saturation"
								backgroundRepeat="no-repeat"
								backgroundSize="cover"
								backgroundAttachment="-moz-initial"
								borderRadius=".3125rem"
							/>
							<Stack
								p=".5rem .75rem"
								pos="absolute"
								bottom="1.5rem"
								textAlign="center"
								w="full"
								mb="8"
								color="white"
							>
								<Text fontSize="2xl">{slide.label}</Text>
								<Text fontSize="lg">{slide.description}</Text>
							</Stack>
						</Box>
					))}
				</Flex>
				<Text {...arrowStyles} left="0" onClick={prevSlide}>
					&#10094;
				</Text>
				<Text {...arrowStyles} right="0" onClick={nextSlide}>
					&#10095;
				</Text>
				<HStack justify="center" pos="absolute" bottom=".5rem" w="full">
					{Array.from({ length: slidesCount }).map((_, slide) => (
						<Box
							key={`dots-${
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								slide
							}`}
							cursor="pointer"
							boxSize={[".4375rem", null, ".9375rem"]}
							m="0 .125rem"
							bg={currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"}
							rounded="50%"
							display="inline-block"
							transition="background-color 0.6s ease"
							_hover={{ bg: "blackAlpha.800" }}
							onClick={() => setCurrentSlide(slide)}
						/>
					))}
				</HStack>
			</Flex>
		</Flex>
	);
}
