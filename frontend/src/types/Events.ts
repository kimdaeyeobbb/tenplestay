import React from 'react';

type FormEvent = React.FormEvent<HTMLFormElement>;
type MouseEvent = React.MouseEvent<HTMLButtonElement>;
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>;
type InvalidEvent = React.InvalidEvent<HTMLInputElement>;
type FocusEvent = React.FocusEvent<HTMLInputElement>;
type ClipboardEvent = React.ClipboardEvent<HTMLInputElement>;
type DragEvent = React.DragEvent<HTMLDivElement>;

export type {
  FormEvent,
  MouseEvent,
  ChangeEvent,
  KeyboardEvent,
  InvalidEvent,
  FocusEvent,
  ClipboardEvent,
  DragEvent,
};
