import React from 'react';
import styled from 'styled-components';
import { Typography as AntTypography } from 'antd';
import type { TypographyProps as AntTypographyProps } from 'antd';

const { Title: AntTitle, Text: AntText, Paragraph: AntParagraph } = AntTypography;

export interface TypographyProps extends AntTypographyProps {
  color?: string;
  weight?: number;
  align?: 'left' | 'center' | 'right';
}

const StyledTypography = styled(AntTypography)<TypographyProps>`
  ${({ color }) => color && `color: ${color};`}
  ${({ weight }) => weight && `font-weight: ${weight};`}
  ${({ align }) => align && `text-align: ${align};`}
`;

const StyledTitle = styled(AntTitle)<TypographyProps>`
  ${({ color }) => color && `color: ${color};`}
  ${({ weight }) => weight && `font-weight: ${weight};`}
  ${({ align }) => align && `text-align: ${align};`}
`;

const StyledText = styled(AntText)<TypographyProps>`
  ${({ color }) => color && `color: ${color};`}
  ${({ weight }) => weight && `font-weight: ${weight};`}
  ${({ align }) => align && `text-align: ${align};`}
`;

const StyledParagraph = styled(AntParagraph)<TypographyProps>`
  ${({ color }) => color && `color: ${color};`}
  ${({ weight }) => weight && `font-weight: ${weight};`}
  ${({ align }) => align && `text-align: ${align};`}
`;

export const Typography = StyledTypography;
export const Title = StyledTitle;
export const Text = StyledText;
export const Paragraph = StyledParagraph; 