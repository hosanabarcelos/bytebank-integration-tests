import { renderHook } from '@testing-library/react';
import { useState, useEffect } from 'react';

test('Hooks', () => {
  const { result } = renderHook(() => {
    const [name, setName] = useState('');
    useEffect(() => {
        setName('Barcelos');
    }, []);

    return name;
  });

  expect(result.current).toBe('Barcelos');
});