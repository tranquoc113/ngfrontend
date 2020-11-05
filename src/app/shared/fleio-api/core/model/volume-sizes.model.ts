export interface IVolumeSizesModel {
    volume_size_increments: { [region: string]: { [volumeType: string]: number } };
    volume_minimum_sizes: { [region: string]: { [volumeType: string]: number } };
}
