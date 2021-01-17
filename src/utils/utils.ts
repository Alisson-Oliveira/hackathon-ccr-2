import User from '../models/User';
import Teacher from '../models/Teacher';
import Business from '../models/Business';

export function getType(type: string) {
  switch (type) {
    case 'student':
      return User;
    case 'teacher':
      return Teacher;
    case 'business':
      return Business;
    default:
      break;
  }
}