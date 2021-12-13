import { useToasts } from 'react-toast-notifications';

// interface dataProps {
//     value: string;
//     mood: undefined;
// }

const useNoify = () => {
    const { addToast } = useToasts();
    const useShowNotify = (value: any, mood: any) => {
        addToast(value, { appearance: mood });
    }
    return {
        useShowNotify
    }

}
export default useNoify