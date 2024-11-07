import { Asset, Company } from "@/app/types/types";

interface Props {
  currentAsset: Asset | null;
  currentCompany: Company;
}

export function AssetView({ currentAsset }: Props) {
  if (!currentAsset) {
    return (
      <div className="bg-slate-200 pt-2 pb-2 pr-2">
        <div className="w-[100%] h-[calc(100vh-70px)] box-border bg-white text-black p-4 border-gray-800 overflow-y-auto">
          selecione
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-200 pt-2 pb-2 pr-2">
      <div className="w-[100%] h-[calc(100vh-70px)] box-border bg-white text-black p-4 border-gray-800 overflow-y-auto">
        <div className="flex flex-col">
          <div className="flex gap-4 items-center border-gray-200 border-b-2 p-5 pl-0">
            <h1 className="text-2xl">{currentAsset.name}</h1>
            <span
              style={{
                backgroundColor:
                  currentAsset.status == "operating" ? "green" : "red",
                borderRadius: "100%",
              }}
              className="h-[12px] w-[12px] inline-block"
            ></span>
          </div>
          <div className="p-6">
            <div className="flex gap-8 border-b-2 border-b-gray-100 pb-8">
              <div className="bg-blue-100 border-2 border-blue-300 border-dashed  w-[650px] h-[260px] flex items-center justify-center text-blue-400 font-bold flex-col">
                <img
                  src="https://gist.githubusercontent.com/ga-fleury/ec2c10610daa4b216a7c812fd07ff1b2/raw/8efed14365dbf14bf461387ef28d98bcb2af23cf/upload.svg"
                  alt=""
                  width={35}
                />
                Adicionar imagem do Ativo
              </div>
              <div className="grid grid-rows-2 w-full">
                <div className="flex flex-col justify-center align-baseline place-content-evenly h-full w-full border-b-gray-100 border-b-2">
                  <h2 className="font-bold text-lg text-gray-800">
                    Tipo de Equipamento
                  </h2>
                </div>
                <div className="flex flex-col justify-center align-baseline place-content-evenly w-full h-full">
                  <h2 className="font-bold text-lg text-gray-800">
                    Responsáveis
                  </h2>
                </div>
              </div>
            </div>
            <div className="py-6 grid grid-cols-2">
              <div className="flex flex-col gap-2">
                {currentAsset.sensorType != null ? (
                  <>
                    <h2 className="font-bold text-lg text-gray-800">
                      ID do Sensor
                    </h2>
                    <div className="flex gap-2">
                      <img
                        src="https://gist.githubusercontent.com/ga-fleury/ec2c10610daa4b216a7c812fd07ff1b2/raw/8a1924d879b81e5064828be29240b9f3da212f1c/radio.svg"
                        alt=""
                      />
                      <p className="text-gray-500">{currentAsset.sensorId}</p>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {currentAsset.sensorType != null ? (
                  <>
                    <h2 className="font-bold text-lg text-gray-800">
                      Tipo do Sensor
                    </h2>
                    <div className="flex gap-2">
                      <img
                        src="https://gist.githubusercontent.com/ga-fleury/ec2c10610daa4b216a7c812fd07ff1b2/raw/8a1924d879b81e5064828be29240b9f3da212f1c/radio.svg"
                        alt=""
                      />
                      <p className="text-gray-500">
                        {currentAsset.sensorType?.charAt(0).toUpperCase()}
                        {currentAsset.sensorType?.slice(1)}
                      </p>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
