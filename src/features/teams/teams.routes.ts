import { Router } from 'express';
import {
  getMyTeam,
  createTeam,
  //updateTeam,
  //inviteTeamMember,
  //removeTeamMember,
  //leaveTeam,
} from './teams.controller.js';

const router = Router();

router.get('/my', getMyTeam);
router.post('/', createTeam);
//router.patch('/:id', updateTeam);
//router.post('/:id/invite', inviteTeamMember);
//router.delete('/:id/members/:userId', removeTeamMember);
//router.post('/:id/leave', leaveTeam);

export default router;
