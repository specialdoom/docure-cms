import { Request, Response } from "express";
import * as admin from 'firebase-admin'
import { handleError } from '../utils';

const defaultRoles = ['user'];

export async function all(req: Request, res: Response) {
  try {
    const listUsers = await admin.auth().listUsers()
    const users = listUsers.users.map(mapUser)
    return res.status(200).send({ users })
  } catch (err) {
    return handleError(res, err)
  }
}

function mapUser(user: admin.auth.UserRecord) {
  const roles = user.customClaims?.roles || defaultRoles;
  return {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || '',
    roles: roles,
    lastSignInTime: user.metadata.lastSignInTime,
    creationTime: user.metadata.creationTime
  }
}

export async function get(req: Request, res: Response) {
  try {
    const { id } = req.params
    const user = await admin.auth().getUser(id)
    return res.status(200).send({ user: mapUser(user) })
  } catch (err) {
    return handleError(res, err)
  }
}

export async function patch(req: Request, res: Response) {
  try {
    const { id } = req.params
    const { role, active } = req.body

    if (!id || !role) {
      return res.status(400).send({ message: 'Missing fields' })
    }

    const userClaims = await (await admin.auth().getUser(id)).customClaims;
    let roles = [...defaultRoles];

    if (active) {
      roles = userClaims?.roles ? [...userClaims.roles, role] : [...defaultRoles, role]
    } else {
      roles = userClaims?.roles ? userClaims.roles.filter((item: any) => item !== role) : [...defaultRoles];
    }

    //@ts-ignore
    await admin.auth().setCustomUserClaims(id, { roles })
    const user = await admin.auth().getUser(id)

    return res.status(204).send({ user: mapUser(user) })
  } catch (err) {
    return handleError(res, err)
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params
    await admin.auth().deleteUser(id)
    return res.status(204).send({})
  } catch (err) {
    return handleError(res, err)
  }
}