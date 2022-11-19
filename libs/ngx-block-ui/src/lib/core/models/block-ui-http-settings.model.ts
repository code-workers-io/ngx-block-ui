export interface HttpSettings {
  // todo investigate
  // eslint-disable-next-line @typescript-eslint/ban-types
  requestFilters?: (RegExp | { method: string, url: RegExp } | Function)[];
  blockAllRequestsInProgress?: boolean;
}
