from argparse import ArgumentParser
import pandas as pd
import os
from sqlalchemy import create_engine


ORIGINAL_FILEPATH = "./extraction_etablissements_idcc.csv"


def read_original_csv():
    print("reading original %s" % ORIGINAL_FILEPATH)
    df = pd.read_csv(
        ORIGINAL_FILEPATH,
        sep=";",
        quotechar='"',
        error_bad_lines=False,
        warn_bad_lines=False
    )
    print("done!")
    return df

def filter_df(df):
    print("filtering and reformatting...")
    df_france = df[df["Pays"] == "France"]
    df_simple = df_france. \
        rename(columns={"Nom de l'établissement": 'name'}) \
        .filter(items=['SIRET', 'name', 'IDCC'])
    print(df_simple.head())
    return df_simple


def output_to_csv(df):
    print("exporting to CSV ....")
    csv_path = './siret_idcc.csv'
    df.to_csv(csv_path, index=False)
    print("exported %s rows to %s" % (df.shape[0], csv_path))


def output_to_sqlite(df):
    print("exporting to SQLite ...")
    sqlite_path = "siret_idcc.sqlite"
    if os.path.exists(sqlite_path):
        os.remove(sqlite_path)
    engine = create_engine('sqlite:///%s' % sqlite_path)
    df.to_sql('companies', con=engine, index=False)
    engine.execute("CREATE INDEX companies_siret_idx ON companies(SIRET);")
    print("exported %s to %s!" % (sqlite_path, df.shape[0]))


if __name__ == '__main__':
    arg_parser = ArgumentParser()
    arg_parser.add_argument('--output', choices=["sqlite", "csv"], default="sqlite")
    args = arg_parser.parse_args()

    df = read_original_csv()
    filtered_df = filter_df(df)

    if args.output == "csv":
        output_to_csv(filtered_df)
    elif args.output == "sqlite":
        output_to_sqlite(filtered_df)

