// Type definitions for @mitmaro/http-authorization-header 0.4.0
// Project: @mitmaro/http-authorization-header
// Definitions by: Tim Oram <https://github.com/MitMaro>

import {RuntimeError} from "@mitmaro/errors";

/**
 * Thrown when the input provided to a creation function is not compliant with RFC-7235. The message will contain a
 * description of why the input was invalid.
 */
export class InvalidHeaderError extends RuntimeError {}

/**
 * Thrown when the header value provided to the parse function is not compliant with RFC-7235. The message will contain
 * a description of why the header value was invalid.
 */
export class InvalidInputError extends RuntimeError {}

/** A parsed set of header values, or a value for Token68 headers */
export interface IParsedHeader {
	/** The auth scheme */
	scheme: string;
	/** The string value when header was a Token68 header */
	value: string | null;
	/** A array or 2-tuple [key, value] representing the auth params from the header */
	values: Array<([string, string])> | null;
}

/**
 * Creates a Authorization header value from a scheme as an optional array of 2-tuple, where each 2-tuple contains
 * the auth-param name and value, respectively. Auth param values are automatically quotes only when needed. A
 * `InvalidInputError` will be thrown if the provided values are not valid.
 *
 * ```javascript
 * create('Custom', [
 *     ['foo', 'bar'],
 *     ['foo', 'fuzz'],
 *     ['buzz', 'quoted "value!"']
 * ]);
 * // Custom foo=bar,foo=fuzz,buzz="quoted \"value!\""
 * ```
 *
 * @param scheme The auth scheme
 * @param params An array of tuple pairs of key and value
 * @returns A formatted authorization header value
 * @throws {InvalidInputError} If `scheme` or a param name are not valid values
 */
export function create(scheme: string, params?: string[]): string;

/**
 * The `createUnsafe` function is identical to `create` in every way except that it does not perform any input
 * validation. It is faster for cases where you can be sure the values provided will not cause an error.
 *
 * @param scheme The auth scheme
 * @param params An array of tuple pairs of key and value
 * @returns A formatted authorization header value
 */
export function createUnsafe(scheme: string, params?: string[]): string;

/**
 * Used to generate legacy auth-schemes (Basic, Digest, Bearer) Authorization header values. It takes a `scheme` and an
 * optional `token`. You are responsible for encoding the `token` using base64, base64url, base32, base16 or another
 * compatible encoding. An `InvalidInputError` will be thrown if any of the input values are invalid.
 *
 * ```javascript
 * createToken68('Basic', Buffer.from('username:password').toString('base64'));
 * // Basic dXNlcm5hbWU6cGFzc3dvcmQ=
 * ```
 *
 * @param scheme The auth scheme
 * @param token A Token68 formatted auth parameter
 * @returns A formatted authorization header value
 * @throws {InvalidInputError} If `scheme` or `token` are not valid values
 */
export function createToken68(scheme: string, token?: string): string;

/**
 * The `createToken68Unsafe` function is identical to `createToken68` in every way except that it does not perform any
 * input validation. It is faster for cases where you can be sure the values provided will not cause an error.
 *
 * @param scheme The auth scheme
 * @param token A Token68 formatted auth parameter
 * @returns A formatted authorization header value
 */
export function createToken68Unsafe(scheme: string, token?: string): string;

/**
 * Parses a authorization header value returning the parsed data as a JavaScript object. If the header cannot be
 * successfully parsed due to invalid input, a `InvalidHeaderError` will be thrown.
 *
 * For legacy headers the return will contain values for the properties that are strings, a `scheme` and a `value`.
 *
 * ```javascript
 * // Basic Zm9vOmJhcg==
 * {
 *      scheme: 'Basic',
 *      value: 'Zm9vOmJhcg=='
 * }
 * ```
 *
 * For modern headers the return will contain important properties, a `scheme` and `values`. `scheme` is astring while
 * `values` in an array of 2-tuples, where each 2-tuple contains the auth param name and value, respectively.
 *
 * ```javascript
 * // Custom foo=bar,foo=fuzz,buzz="quoted \"value!\""
 * {
 *   scheme: 'Custom',
 *     values: [
 *         ['foo', 'bar'],
 *         ['foo', 'fuzz'],
 *         ['buzz', 'quoted "value!"']
 *     ]
 * }
 * ```
 *
 * @param headerValue The value of an authorization header
 * @returns The parsed header params
 */
export function parse(headerValue: string): IParsedHeader;
