import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useState, useRef, useEffect, FormEvent } from 'react';
import clsx from 'clsx';

export type ArticleParamsFormProps = {
	setAppState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setAppState }: ArticleParamsFormProps) => {
	const asideRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleChange = (fieldName: string) => (value: OptionType) => {
		setFormState((prev) => ({ ...prev, [fieldName]: value }));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setAppState(formState);
	};

	const handleReset = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		setAppState(defaultArticleState);
	};

	return (
		<div ref={asideRef}>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' uppercase size={31} weight={800}>
						Задайте параметры
					</Text>

					<Select
						title='шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
					/>

					<RadioGroup
						title='размер шрифта'
						name='fontSizeOption'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>

					<Select
						title='цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>

					<Separator />

					<Select
						title='цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>

					<Select
						title='ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='сбросить' htmlType='reset' type='clear' />
						<Button title='применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
