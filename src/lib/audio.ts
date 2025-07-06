import { browser } from '$app/environment';

let Tone: typeof import('tone') | null = null;
let synth: import('tone').Synth | null = null;

export const initAudio = async (): Promise<void> => {
	if (browser) {
		if (!Tone) {
			Tone = await import('tone');
		}
		// Initialize audio context
		await Tone.start();

		// Create synth if it doesn't exist
		if (!synth) {
			synth = new Tone.Synth({
				oscillator: {
					type: 'sine'
				},
				envelope: {
					attack: 0.005,
					decay: 0.1,
					sustain: 0.3,
					release: 1
				}
			}).toDestination();
		}
	}
};

export const playNote = (noteName: string, duration: string = '8n'): void => {
	if (browser && synth) {
		// Play the note with the given duration
		synth.triggerAttackRelease(noteName, duration);
	} else if (browser) {
		console.error('Synth not initialized. Call initAudio() first.');
	}
};