import { Body, Controller, Get, Post, Request, Response, SerializeOptions } from '@nestjs/common';

import { FastifyReply, FastifyRequest } from 'fastify';

import { getRequestToken, resultError } from '../utils/_util';
import { IAuth } from '../utils/types';

export function createFakeUserList(): IAuth[] {
    return [
        {
            id: '1',
            username: 'pincman',
            email: 'pincman@qq.com',
            nickname: 'pincman',
            avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
            desc: 'manager',
            password: '123456',
            token: 'fakeToken1',
            homePath: '/dashboard/analysis',
            permissions: [],
        },
        {
            id: '2',
            username: 'test',
            email: 'pincman@qq.com',
            password: '123456',
            nickname: 'test user',
            avatar: 'https://q1.qlogo.cn/g?b=qq&nk=339449197&s=640',
            desc: 'tester',
            token: 'fakeToken2',
            homePath: '/dashboard/workbench',
            permissions: [],
        },
    ];
}
@Controller('auth')
export class AuthController {
    @Post('login')
    async login(
        @Body() body: Record<string, any>,
        @Response({ passthrough: true }) response: FastifyReply,
    ) {
        const { credential, password } = body;
        const checkUser = createFakeUserList().find(
            (item) =>
                (item.username === credential || item.nickname === credential) &&
                password === item.password,
        );
        if (!checkUser) {
            response.status(401).send(resultError('Incorrect account or password'));
        }
        const { token } = checkUser;
        console.log(token);
        return { token };
    }

    @Get('info')
    @SerializeOptions({})
    async info(
        @Request() request: FastifyRequest,
        @Response({ passthrough: true }) response: FastifyReply,
    ) {
        const token = getRequestToken(request);
        if (!token) {
            response.status(401).send(resultError('Invalid token'));
        }
        const checkUser = createFakeUserList().find((item) => item.token === token);
        if (!checkUser) {
            response
                .status(401)
                .send(resultError('The corresponding user information was not obtained!'));
        }
        return checkUser;
    }
}
