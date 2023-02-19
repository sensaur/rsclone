import React, { useState, useEffect } from 'react';

export default function useDarkMode() {
  const root = window.document.documentElement as HTMLElement;
  root.classList.toggle('dark');
}