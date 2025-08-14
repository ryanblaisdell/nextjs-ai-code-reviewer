'use client';

import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css'; // Don't forget this!

const theme = createTheme({
  /** Customize your Mantine theme here */
  // Example: primaryColor: 'indigo',
  // colors: {
  //   'blaze-green': ['#00FF00', '#00DD00', '#00BB00', '#00A000', '#008800', '#007000', '#005800', '#004000', '#002800', '#001000'],
  // },
  // primaryColor: 'blaze-green',
});

export default function MantineProviders({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
  );
}