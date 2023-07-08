export interface State {
  timelineScale: number;
  zoomLevel: number;
  playbackSpeed: number;
  outputFormat: string;
  newLayer: Layer | null;
  dragging: boolean;
  trimming: boolean;
  // NOTE: Miliseconds
  currentTime: number;
  // NOTE: Miliseconds
  duration: number;
  seekHoverOffset: number;
  seekbarOffset: number;
  playInterval: ReturnType<typeof setInterval> | null;
  seeking: boolean;
}

export interface TabItem {
  value: number;
  name: string;
  icon: string;
}

export interface SelectItem<T> {
  title: string;
  value: T;
}

export interface Layer {
  element: any;
  name: string;
  type: string;
  hidden: boolean;
  locked: boolean;
  opacity: number;
  timeToShow: number;
  timeToHide: number;
}

export interface AssetEvent {
  type: string;
  value: string;
  file?: File;
}

export interface ActiveObjectChangeEvent {
  type: string;
  value: string | number;
}
