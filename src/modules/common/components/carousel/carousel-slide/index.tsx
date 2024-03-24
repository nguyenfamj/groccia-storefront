'use client';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import { conditionalClassNames } from '@lib/util/conditional-classname';
import { NextButton, PrevButton, usePrevNextButtons } from '../carousel-arrow';
import { CarouselDot, useDotButton } from '../carousel-dot';

type Props = {
  options?: EmblaOptionsType;
  children: React.ReactNode;
  chevronNavigation?: boolean;
  dotNavigation?: boolean;
};

export default function CarouselSlide({
  options,
  children,
  chevronNavigation = false,
  dotNavigation = false,
}: Props) {
  const [carouselRef, carouselApi] = useEmblaCarousel(options);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(carouselApi);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(carouselApi);

  return (
    <section className="relative overflow-hidden" ref={carouselRef}>
      <div className="flex touch-pan-y backface-hidden space-x-10 py-4">
        {children}
      </div>

      {/* Chevron buttons */}
      {chevronNavigation && (
        <div className="absolute flex justify-between w-full h-11 -translate-y-1/2 top-1/2 px-2">
          {carouselApi?.canScrollPrev() ? (
            <div className="bg-primary-500 w-10 h-10 text-white rounded-full flex items-center justify-center cursor-pointer z-10 hover:shadow-md hover:w-11 hover:h-11 transition-all">
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              />
            </div>
          ) : (
            <div />
          )}
          {carouselApi?.canScrollNext() && (
            <div className="bg-primary-500 w-10 h-10 text-white rounded-full flex items-center justify-center cursor-pointer z-10 hover:shadow-md hover:w-11 hover:h-11 transition-all">
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              />
            </div>
          )}
        </div>
      )}

      {/* Dot navigation */}
      {dotNavigation && (
        <div className="absolute left-0 right-0 flex items-center justify-center bottom-0">
          {scrollSnaps.map((_, index) => (
            <CarouselDot
              key={index}
              className={conditionalClassNames(
                index === selectedIndex ? 'bg-black' : 'bg-slate-400',
                'flex items-center w-6 h-1 ml-2 mr-2 rounded-lg'
              )}
              onClick={() => onDotButtonClick(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
}