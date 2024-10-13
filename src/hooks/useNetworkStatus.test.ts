import { act, renderHook } from '@testing-library/react';
import useNetworkStatus, { NetworkStatus, props } from './useNetworkStatus';

describe('useNetworkStatus', () => {
  it('should initialize with correct network status', () => {
    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current).toEqual<NetworkStatus>({
      isOnline: expect.any(Boolean),
      isOffline: expect.any(Boolean),
    });
  });

  it('should call handleCustomOnline when online event is triggered', async () => {
    const handleCustomOnline = jest.fn();
    const { result } = renderHook(() =>
      useNetworkStatus({ handleCustomOnline })
    );

    await act(async () => {
      const mockEvent = new Event('online');
      window.dispatchEvent(mockEvent);
    })

    expect(handleCustomOnline).toHaveBeenCalledWith({
      isOnline: true,
      isOffline: false,
    });
    expect(result.current).toEqual<NetworkStatus>({
      isOnline: true,
      isOffline: false,
    });
  });

  it('should call handleCustomOffline when offline event is triggered', () => {
    const handleCustomOffline = jest.fn();
    const { result } = renderHook(() =>
      useNetworkStatus({ handleCustomOffline })
    );

    act(()=>{
      const mockEvent = new Event('offline');
      window.dispatchEvent(mockEvent);
    })

    expect(handleCustomOffline).toHaveBeenCalledWith({
      isOnline: false,
      isOffline: true,
    });
    expect(result.current).toEqual<NetworkStatus>({
      isOnline: false,
      isOffline: true,
    });
  });

  it('should remove event listeners on unmount', () => {
    const handleCustomOnline = jest.fn();
    const handleCustomOffline = jest.fn();
    const { unmount } = renderHook(() =>
      useNetworkStatus({ handleCustomOnline, handleCustomOffline })
    );
    act(()=>{
      unmount();

    })

    act(()=>{
      const mockOnlineEvent = new Event('online');
      const mockOfflineEvent = new Event('offline');
      window.dispatchEvent(mockOnlineEvent);
      window.dispatchEvent(mockOfflineEvent);
    })

    expect(handleCustomOnline).not.toHaveBeenCalled();
    expect(handleCustomOffline).not.toHaveBeenCalled();
  });
});
