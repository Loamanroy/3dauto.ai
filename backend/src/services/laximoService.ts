import axios from 'axios';

interface LaximoPart {
  unitId: string;
  name: string;
  oem: string;
  imageUrl: string;
}

interface LaximoResponse {
  parts: LaximoPart[];
}

class LaximoService {
  private baseUrl = 'https://api.laximo.ru';
  private login: string;
  private password: string;

  constructor() {
    this.login = process.env.LAXIMO_LOGIN || '';
    this.password = process.env.LAXIMO_PASSWORD || '';
  }

  async findVehicleByVin(catalogCode: string, vin: string) {
    try {
      const response = await axios.post(`${this.baseUrl}/oem/findVehicleByVin`, {
        login: this.login,
        password: this.password,
        catalogCode,
        vin
      });
      return response.data;
    } catch (error) {
      console.error('Laximo findVehicleByVin error:', error);
      throw error;
    }
  }

  async listUnits(catalogCode: string, vehicleId: string) {
    try {
      const response = await axios.post(`${this.baseUrl}/oem/listUnits`, {
        login: this.login,
        password: this.password,
        catalogCode,
        vehicleId
      });
      return response.data;
    } catch (error) {
      console.error('Laximo listUnits error:', error);
      throw error;
    }
  }

  async listQuickDetail(catalogCode: string, unitId: string) {
    try {
      const response = await axios.post(`${this.baseUrl}/oem/listQuickDetail`, {
        login: this.login,
        password: this.password,
        catalogCode,
        unitId
      });
      return response.data;
    } catch (error) {
      console.error('Laximo listQuickDetail error:', error);
      throw error;
    }
  }

  getMockParts(): LaximoPart[] {
    return [
      {
        unitId: "1724523522",
        name: "Крышка ГБЦ",
        oem: "FORD1234567",
        imageUrl: "https://img.laximo.ru/catalog/PSA_P202311/00008825.gif"
      },
      {
        unitId: "1724523523", 
        name: "Свечи зажигания",
        oem: "NGK12345",
        imageUrl: "https://img.laximo.ru/catalog/PSA_P202311/00008826.gif"
      },
      {
        unitId: "1724523524",
        name: "Катушка зажигания",
        oem: "BOSCH98765",
        imageUrl: "https://img.laximo.ru/catalog/PSA_P202311/00008827.gif"
      },
      {
        unitId: "1724523525",
        name: "Прокладка клапанной крышки",
        oem: "ELRING54321",
        imageUrl: "https://img.laximo.ru/catalog/PSA_P202311/00008828.gif"
      }
    ];
  }
}

export default new LaximoService();
