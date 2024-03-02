import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    MutationDefinition
} from '@reduxjs/toolkit/query'
import {ICheckPresenceData} from "../../interface/app.interface";
import {MutationTrigger} from "@reduxjs/toolkit/dist/query/react/buildHooks";


interface IProps {
    value: string,
    postValue: string
    minLength: number,
    maxLength: number,
    testRegex: RegExp ,
    setIsState: (v: boolean) => void
    mutate: MutationTrigger<MutationDefinition<ICheckPresenceData, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "api", boolean, "api">>
}

export const uniqueFieldChecker = async ({...props} : IProps) => {

    try {
        if (props.value?.length >= props.minLength
            && props.value?.length <= props.maxLength
            && props.testRegex.test(props.value)) {

            const newData = {
                [props.postValue]: props.value,
                endpoint: 'http://localhost:3000/',
            }

            const response = await props.mutate(newData)

            if ('data' in response) {
                props.setIsState(response.data)
            }

        } else {
            props.setIsState(false);
        }

    } catch (error) {
        console.error('Ошибка:', error);
    }
}