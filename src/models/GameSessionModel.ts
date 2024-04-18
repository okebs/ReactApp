export type Player = {
  playerId:string;
  timeStarted?: number | null;
  timeFinished?: number | null;
  duration?: number | null;
  };
  
  export type GameSession = {
    gameId: string;
    players: Record<string, Player>;
    state: 'waiting' | 'active' | 'finished';
    teacherId: string;
    currentChallenge: any; // structure depends on the game
    teamAssignments?: Record<string, string>; // Optional: for assigning players to teams
  };
  