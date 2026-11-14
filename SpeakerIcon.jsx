/* Speaker icon for the Mute toggle and the Replay Voice button. Sound waves animate while Orbitto speaks. */
export function SpeakerIcon({ muted = false }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" fill="currentColor" fillOpacity=".25" />
      {muted ? (
        <path d="M16 9.5l5 5M21 9.5l-5 5" />
      ) : (
        <>
          <path className="wave w1" d="M15.5 9.2a4 4 0 0 1 0 5.6" />
          <path className="wave w2" d="M18.3 6.6a7.6 7.6 0 0 1 0 10.8" />
        </>
      )}
    </svg>
  );
}
