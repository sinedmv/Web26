import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus, NotFoundException,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { EntityNotFoundError, QueryFailedError } from "typeorm";
import { GraphQLError } from 'graphql';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const requestType = host.getType();

        if (requestType.toString() === "graphql") {
            const gqlHost = GqlArgumentsHost.create(host);

            if (exception instanceof HttpException) {
                const response = exception.getResponse();
                const message = typeof response === 'string'
                    ? response
                    : (response as any).message || 'Error';

                return new GraphQLError(message, {
                    extensions: {
                        code: this.getErrorCode(exception.getStatus()),
                        status: exception.getStatus(),
                    },
                });
            } else if (exception instanceof EntityNotFoundError) {
                return new GraphQLError('Entity not found', {
                    extensions: { code: 'NOT_FOUND', status: 404 },
                });
            } else if (exception instanceof QueryFailedError) {
                return new GraphQLError('Database error', {
                    extensions: { code: 'BAD_REQUEST', status: 400 },
                });
            }

            return new GraphQLError('Internal server error', {
                extensions: { code: 'INTERNAL_SERVER_ERROR', status: 500 },
            });
        }

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            message = typeof res === 'string' ? res : (res as any).message || res;
        } else if (exception instanceof EntityNotFoundError) {
            status = HttpStatus.NOT_FOUND;
            message = exception.message;
        } else if (exception instanceof NotFoundException) {
            status = HttpStatus.NOT_FOUND;
            message = exception.message;
        }
        else if (exception instanceof QueryFailedError) {
            status = HttpStatus.BAD_REQUEST;
            message = (exception as any).message;
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
        });
    }

    private getErrorCode(status: number): string {
        switch (status) {
            case 400: return 'BAD_REQUEST';
            case 401: return 'UNAUTHORIZED';
            case 403: return 'FORBIDDEN';
            case 404: return 'NOT_FOUND';
            default: return 'INTERNAL_SERVER_ERROR';
        }
    }
}