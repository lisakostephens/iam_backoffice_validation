import React from 'react'
import { ShowProps } from '../../infrastructure/interfaces/components/show';

export const Show = ({ when, fallback, children }: ShowProps) => (
    <> { when == true ? children : (fallback ?? <></>) } </>
);

