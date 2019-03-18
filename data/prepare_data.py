from argparse import ArgumentParser
import pandas as pd
import os
from sqlalchemy import create_engine
import requests

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
        rename(columns={
            "Nom de l'établissement": 'name',
            "SIRET": 'siret',
            'IDCC': 'idcc_num'
        }) \
        .filter(items=['siret', 'name', 'idcc_num'])
    print(df_simple.head())
    return df_simple

def get_num_to_titles_df():
    dila2sql_api_url = "https://api.dila2sql.num.social.gouv.fr";
    req = requests.get("%s/v1/base/KALI/conteneurs?nature=IDCC" % dila2sql_api_url)
    num_to_title = {}
    for conteneur in req.json():
        num_to_title[conteneur["num"]] = conteneur["titre"]
    return pd.DataFrame.from_dict({
        "num": list(num_to_title.keys()),
        "titre": list(num_to_title.values())
    })

def output_to_csv(siret_to_idcc_df, num_to_titles_df):
    print("exporting to CSV ....")
    siret_to_idcc_csv_path = './siret_idcc.csv'
    siret_to_idcc_df.to_csv(siret_to_idcc_csv_path, index=False)
    print("exported %s rows to %s" % (siret_to_idcc_df.shape[0], siret_to_idcc_csv_path))
    num_to_title_csv_path = './idcc_titles.csv'
    num_to_titles_df.to_csv(num_to_title_csv_path, index=False)
    print("exported %s IDCCs to %s" % (num_to_titles_df.shape[0], num_to_title_csv_path))

def output_to_sqlite(siret_to_idcc_df, num_to_titles_df):
    print("exporting to SQLite ...")
    sqlite_path = "siret_idcc.sqlite"
    if os.path.exists(sqlite_path):
        os.remove(sqlite_path)
    engine = create_engine('sqlite:///%s' % sqlite_path)
    siret_to_idcc_df.to_sql('companies', con=engine, index=False)
    num_to_titles_df.to_sql('idcc', con=engine, index=False)
    engine.execute("CREATE INDEX companies_siret_idx ON companies(siret);")
    engine.execute("CREATE INDEX idcc_num_idx ON idcc(num);")
    print("exported %s rows to %s!" % (sqlite_path, siret_to_idcc_df.shape[0]))

if __name__ == '__main__':
    arg_parser = ArgumentParser()
    arg_parser.add_argument('--output', choices=["sqlite", "csv"], default="sqlite")
    args = arg_parser.parse_args()

    df = read_original_csv()
    siret_to_idcc_df = filter_df(df)
    num_to_titles_df = get_num_to_titles_df()

    if args.output == "csv":
        output_to_csv(siret_to_idcc_df, num_to_titles_df)
    elif args.output == "sqlite":
        output_to_sqlite(siret_to_idcc_df, num_to_titles_df)

