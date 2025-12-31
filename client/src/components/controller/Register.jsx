import { VitecLogo } from '../../utils/VitecLogo';

export const Register = ({ onGoToRegister }) => {
  return (
    <div className="flex flex-row w-full justify-center py-6 bg-[#333332d8]">
      <div
        className="flex
          flex-col
          items-center
          gap-4
          w-full
          max-w-[500px]
          px-8 py-6
          bg-neutral-800
          rounded-xl
          shadow-lg"
      >
        <VitecLogo />

        <span className="text-2xl text-[#adadad] font-semibold">
          ¿Nuevo en STACK-STORE?
        </span>

        <p className="text-center text-[#9c9c9c60]">
          Crea una cuenta y comienza a gestionar tu tienda en segundos.
        </p>

        <button
          onClick={onGoToRegister}
          className="
            w-full
            max-w-[240px]
            py-2
            px-4
            rounded-lg
            font-semibold
            text-lg
            cursor-pointer
            text-[#adadad]
            bg-[#9c9c9c60]
            transition-all
            hover:bg-[#5c9c19d8]
            hover:scale-[1.02]
          "
        >
          CREAR CUENTA
        </button>
      </div>
    </div>
  );
};
